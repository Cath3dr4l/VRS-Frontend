# Video Rental System (VRS) Frontend

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software.

- Node.js
- npm

### Installing

A step by step series of examples that tell you how to get a development environment running.

1. Clone the repo: `git clone https://github.com/Cath3dr4l/VRS-Frontend`
2. Move to the project directory: `cd VRS-Frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

#### Setting up the .env file

After setting up the development server, you need to create a `.env` file in the root directory of the project to store environment variables:

1. Create a new file named `.env` in the root directory of the project.
2. Add the following line to the `.env` file:
   ```env
   REACT_APP_RZP_KEY_ID=your_razorpay_api_key_id (Replace `your_razorpay_api_key_id` with your actual Razorpay API Key ID.)
   ```

### Proxy

In the `package.json` file, you'll find a line that looks like this:

```json
"proxy": "http://localhost:9000",
```

This line is used to specify the server that the client-side (React) part of the application should proxy to in development. This is necessary to avoid CORS issues when the server's URL is different from the client's URL.

In this case, the server is running on http://localhost:9000, so that's what we've set the proxy to. This means that when you make requests to /api/some-endpoint, the development server will automatically proxy your request to http://localhost:9000/api/some-endpoint.

If your server is running on a different URL, you should change the proxy setting to match your server's URL.

## Backend

For the backend code, please refer to the [VRS Backend repository](https://github.com/harshit-jain52/VRS-Backend).
