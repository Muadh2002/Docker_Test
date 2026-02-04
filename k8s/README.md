# Kubernetes Local Deployment Guide

This guide explains how to run the React + PHP project on Kubernetes locally using Docker Desktop.

## What is Kubernetes?
Kubernetes (K8s) is a container orchestration platform that manages Docker containers at scale. Think of it as a smart manager that:
- Keeps your containers running
- Restarts them if they crash
- Distributes traffic between multiple containers
- Scales your application up or down

## Files Explained

### `backend-deployment.yaml`
- **Deployment**: Tells Kubernetes to run 1 copy of your PHP backend
- **Service**: Exposes backend on port 30800 so you can access it

### `frontend-deployment.yaml`
- **Deployment**: Tells Kubernetes to run 1 copy of your React frontend
- **Service**: Exposes frontend on port 30300 so you can access it

## Setup Steps

See the main instructions below for step-by-step setup!
