# ShopyPal

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2022.11.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D%205.0.0-blue)
![nextJS](https://img.shields.io/badge/nextJS-%3E%3D%2015.11.0-blue)

ShopyPal is an e-commerce platform built with Next.js, TypeScript and MySQL. It's a project that I'm currently working on my free time. with the goal of learning more about Next.js and making a complete e-commerce platform.
## Features

- User Authentication (Login, Register)
- JWT Token Verification
- Secure Password Hashing
- User Profile Management
- Product Listing and Details 
- Cart Management

## Technologies Used

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT, bcrypt

## Getting Started

### Prerequisites

- Node.js >= 22.11.0
- TypeScript >= 5.0.0
- MySQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/LyneQ/shopypal.git
    cd shopypal
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env.local` file in the root directory and add the following:
    ```dotenv
    NUXT_APPNAME=ShopyPal
    NUXT_URL=http://localhost:3000
    API_BASE_URL=http://localhost:3000/api
    JWT_SECRET="your_jwt_secret"
    DB_HOST=your_db_host
    DB_PORT=3306
    DB_USER=your_db_user
    DB_PASSWORD="your_db_password"
    DB_NAME=shopypal
    ```

4. Run the application:
    ```sh
    npm run dev
    ```

## Usage

- Visit `http://localhost:3000` to access the application.
- Register a new user or log in with existing credentials.
- Explore the features and functionalities of ShopyPal.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact [yourname@domain.com](mailto:yourname@domain.com).