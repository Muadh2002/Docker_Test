<?php
/**
 * Simple PHP REST API for User Management
 * This demonstrates basic CRUD operations with PHP
 */

// Enable CORS (Cross-Origin Resource Sharing) for React frontend
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple file-based storage (in production, use a real database)
$dataFile = __DIR__ . '/../data/users.json';

// Ensure data directory exists
if (!file_exists(__DIR__ . '/../data')) {
    mkdir(__DIR__ . '/../data', 0777, true);
}

// Initialize data file if it doesn't exist
if (!file_exists($dataFile)) {
    $initialData = [
        [
            'id' => 1,
            'name' => 'John Doe',
            'email' => 'john@example.com'
        ],
        [
            'id' => 2,
            'name' => 'Jane Smith',
            'email' => 'jane@example.com'
        ]
    ];
    file_put_contents($dataFile, json_encode($initialData, JSON_PRETTY_PRINT));
}

// Read users from file
function getUsers() {
    global $dataFile;
    $data = file_get_contents($dataFile);
    return json_decode($data, true) ?: [];
}

// Write users to file
function saveUsers($users) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($users, JSON_PRETTY_PRINT));
}

// Get next available ID
function getNextId($users) {
    if (empty($users)) return 1;
    $maxId = max(array_column($users, 'id'));
    return $maxId + 1;
}

// Handle different HTTP methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // GET - Retrieve all users
        $users = getUsers();
        echo json_encode([
            'success' => true,
            'users' => $users,
            'count' => count($users)
        ]);
        break;

    case 'POST':
        // POST - Add a new user
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate input
        if (empty($input['name']) || empty($input['email'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Name and email are required'
            ]);
            exit();
        }

        // Validate email format
        if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid email format'
            ]);
            exit();
        }

        // Add new user
        $users = getUsers();
        $newUser = [
            'id' => getNextId($users),
            'name' => htmlspecialchars(trim($input['name'])),
            'email' => htmlspecialchars(trim($input['email']))
        ];
        
        $users[] = $newUser;
        saveUsers($users);

        // --- Start of n8n Webhook Integration ---
        // After successfully saving the user, send their data to the n8n webhook.
        $n8nWebhookUrl = 'https://muadh2002.app.n8n.cloud/webhook-test/dd53d705-0e71-4cd9-b220-f9863f43fc41';

        // Use cURL to send the new user data to the webhook
        $ch = curl_init($n8nWebhookUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($newUser));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        // Execute and close the cURL session (we don't need the response)
        curl_exec($ch);
        curl_close($ch);
        // --- End of n8n Webhook Integration ---

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'User added successfully',
            'user' => $newUser
        ]);
        break;

    case 'DELETE':
        // DELETE - Remove a user by ID
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Valid user ID is required'
            ]);
            exit();
        }

        $users = getUsers();
        $found = false;
        
        // Filter out the user with specified ID
        $users = array_values(array_filter($users, function($user) use ($id, &$found) {
            if ($user['id'] == $id) {
                $found = true;
                return false;
            }
            return true;
        }));

        if (!$found) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'User not found'
            ]);
            exit();
        }

        saveUsers($users);
        echo json_encode([
            'success' => true,
            'message' => 'User deleted successfully'
        ]);
        break;

    default:
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'message' => 'Method not allowed'
        ]);
        break;
}
?>
