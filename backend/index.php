<?php
/**
 * PHP Backend - Main Entry Point
 * Simple landing page for the PHP server
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Backend - React + PHP Project</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            text-align: center;
        }
        h1 {
            color: #667eea;
            margin-bottom: 20px;
        }
        .status {
            background: #10ac84;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            display: inline-block;
            margin: 20px 0;
            font-weight: bold;
        }
        .info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
        }
        .info h3 {
            color: #333;
            margin-bottom: 10px;
        }
        .endpoint {
            background: white;
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
            font-family: monospace;
            border-left: 4px solid #667eea;
        }
        code {
            background: #333;
            color: #0f0;
            padding: 2px 6px;
            border-radius: 3px;
        }
        .php-info {
            margin-top: 20px;
            font-size: 0.9rem;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 PHP Backend Server</h1>
        <div class="status">✓ Server is Running</div>
        
        <div class="info">
            <h3>API Endpoints:</h3>
            <div class="endpoint">
                <code>GET</code> /api/users.php - Get all users
            </div>
            <div class="endpoint">
                <code>POST</code> /api/users.php - Add new user
            </div>
            <div class="endpoint">
                <code>DELETE</code> /api/users.php?id={id} - Delete user
            </div>
        </div>

        <div class="php-info">
            <strong>PHP Version:</strong> <?php echo phpversion(); ?><br>
            <strong>Server:</strong> <?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Built-in PHP Server'; ?>
        </div>

        <p style="margin-top: 20px; color: #666;">
            Connect your React frontend to these endpoints to start learning!
        </p>
    </div>
</body>
</html>
