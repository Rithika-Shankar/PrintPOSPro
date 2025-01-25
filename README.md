# PrintPOS Pro

**PrintPOS Pro** is an integrated printer and Point of Sale (POS) system tailored for the medical field to streamline prescription generation and billing. This application uses a voice-to-text transcription service for doctors to dictate prescriptions, a review and edit step, billing integration, and printing functionality. It also saves all records in a database for future reference.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Database Setup](#database-setup)
- [Printer Setup](#printer-setup)
- [Deployment](#deployment)
- [Using Vultr Cloud Services](#using-vultr-cloud-services)
- [Laravel Chatbot UI Integration](#laravel-chatbot-ui-integration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Prerequisites
To set up the **PrintPOS Pro** application, ensure you have the following installed:
- Node.js and npm (for frontend)
- Java (for backend with Spring Boot)
- Maven or Gradle (for backend dependency management)
- MySQL (for the database)
- POS Printer (configured to work with the application)
- Vultr Cloud Account (for hosting the database and transcription service)
- Laravel Chatbot UI (for the chatbot interface)

---

## Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/RepakulaTharuni/printpos-pro.git
    ```

2. Navigate to the frontend directory:
    ```bash
    cd printpos-pro/frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```
   The frontend will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/RepakulaTharuni/printpos-pro.git
    ```

2. Navigate to the backend directory:
    ```bash
    cd printpos-pro/backend
    ```

3. Install dependencies (using Maven):
    ```bash
    mvn install
    ```

4. Run the backend server:
    ```bash
    mvn spring-boot:run
    ```
   The backend Spring Boot application will be available at [http://localhost:8080](http://localhost:8080).

---

## Database Setup

1. Install MySQL and create a new database:
    ```sql
    CREATE DATABASE printposdb;
    ```

2. Import the database schema:
   - Locate the `schema.sql` file in the `database` folder.
   - Run the following command in your MySQL client:
     ```bash
     mysql -u root -p printposdb < path/to/schema.sql
     ```

3. Configure the database connection:
   - Open the `application.properties` file located in `backend/src/main/resources`.
   - Update the MySQL connection details:
     ```properties
     spring.datasource.url=jdbc:mysql://your-vultr-host/printposdb
     spring.datasource.username=root
     spring.datasource.password=yourpassword
     ```

---

## Printer Setup
Ensure that the POS printer is properly connected and configured. Follow your printer’s user manual for setup. **PrintPOS Pro** supports various receipt printers via standard drivers.

---

## Deployment

### 1. Vultr Cloud Setup
- **Sign up for Vultr**: If you don't have an account, sign up at [Vultr](https://www.vultr.com/).
- **Create a New Server**: Launch a new instance (preferably Ubuntu).
- **Deploy MySQL Database**:
  ```bash
  ssh root@your-vultr-ip
  sudo apt update
  sudo apt install mysql-server
  sudo mysql_secure_installation
  ```
  
- **2. Create you Database**:
  ```bash
  CREATE DATABASE printposdb;
  ```

- **3. Transcription Service**:
Utilize Vultr's Object Storage or AI services to integrate speech-to-text features.

---

## Using Vultr Cloud Services

### 1. **Setting Up MySQL Database on Vultr**
   - **Sign up for Vultr**: If you don't already have a Vultr account, sign up at [Vultr](https://www.vultr.com).
   - **Create a New Cloud Instance**:
     - Select the cloud instance you prefer (e.g., a high-frequency or standard instance based on your usage).
     - Choose an OS (e.g., Ubuntu 20.04 LTS).
     - Set up the SSH key and other configurations.
     - After the instance is created, you'll receive the IP address.
   - **Install MySQL**:
     - SSH into the instance:
       ```bash
       ssh root@your-vultr-ip
       ```
     - Update the server:
       ```bash
       sudo apt update
       sudo apt upgrade -y
       ```
     - Install MySQL:
       ```bash
       sudo apt install mysql-server
       sudo mysql_secure_installation
       ```
     - Log into MySQL:
       ```bash
       sudo mysql
       ```
     - Create your database for PrintPOS Pro:
       ```sql
       CREATE DATABASE printposdb;
       ```
     - Create a user for your application and grant the necessary permissions:
       ```sql
       CREATE USER 'printposuser'@'localhost' IDENTIFIED BY 'yourpassword';
       GRANT ALL PRIVILEGES ON printposdb.* TO 'printposuser'@'localhost';
       FLUSH PRIVILEGES;
       ```

### 2. **Using Vultr Object Storage for Speech-to-Text Transcription**
PrintPOS Pro uses speech-to-text functionality for transcription of doctor-prescribed prescriptions. For this, you can use Vultr's **Object Storage** service, which allows you to store large audio files and then process them for transcription.

   - **Set up Object Storage on Vultr**:
     - Login to your Vultr account and navigate to the Object Storage section.
     - Create a new storage bucket for storing audio files (e.g., `prescription-audio`).
     - Obtain your Access Key and Secret Key from the Vultr dashboard.

   - **Integrate Transcription Service**:
     - Use the stored audio files in the bucket for transcription via an API like Google Cloud Speech-to-Text, or any other transcription service that integrates with Vultr's Object Storage. You can upload the audio files from your frontend to the storage and then send them for transcription.
     - In your backend code, use the Vultr SDK to access the object storage and send the audio file for processing:

     ```java
     // Example using Java AWS SDK (compatible with Vultr Object Storage)
     AmazonS3 s3Client = AmazonS3Client.builder()
             .endpointOverride(URI.create("https://your-vultr-object-storage-endpoint"))
             .region(Region.US_EAST_1)
             .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create("access-key", "secret-key")))
             .build();
     
     // Upload an audio file
     File file = new File("path/to/audio/file.wav");
     s3Client.putObject(PutObjectRequest.builder()
             .bucket("prescription-audio")
             .key("audio-file-key")
             .build(), RequestBody.fromFile(file));
     ```

### 3. **Deploying the Application on Vultr**
   - **Set up a new cloud server instance** for both backend and frontend components.
   - SSH into the instance and deploy both the backend and frontend by following the previously mentioned setup instructions.
   - Use a tool like **NGINX** or **Apache** to reverse proxy your backend application for a public-facing URL:
     ```bash
     sudo apt install nginx
     sudo nano /etc/nginx/sites-available/printpos
     ```
     Inside the file, configure the proxy:

     ```nginx
     server {
         listen 80;
         server_name your-domain.com;
         
         location / {
             proxy_pass http://localhost:8080;
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header X-Forwarded-Proto $scheme;
         }
     }
     ```
   - After editing, enable the site and restart NGINX:
     ```bash
     sudo ln -s /etc/nginx/sites-available/printpos /etc/nginx/sites-enabled/
     sudo systemctl restart nginx
     ```

---

## Laravel Chatbot UI Integration

The chatbot interface in the frontend uses **Laravel Chatbot UI**.

1. Ensure you have Laravel set up on your server.
2. Update your chatbot settings in `.env`:

```env
LARAVEL_CHATBOT_API_URL=http://your-laravel-backend/chatbot
```
3. Add the chatbot to your frontend:
   ```bash
   import Chatbot from 'laravel-chatbot-ui';
   ```

## Push to GitHub
- Use the following commands to push your project to GitHub:
  ```bash
   git init
   git add .
   git commit -m "Initial commit of PrintPOS Pro"
   git remote add origin https://github.com/RepakulaTharuni/printpos-pro.git
   git push -u origin main
   ```

## Contributing
- We welcome contributions to improve PrintPOS Pro! Please follow these guidelines:

- **1. Fork the repository.**
- **2. Create a feature branch:**
  ```bash
   git checkout -b feature/new-feature
   ```
- **3. Commit your changes**:
  ```bash
   git commit -m 'Add new feature'
   ```
- **4. Push to your branch:**:
  ```bash
   git push origin feature/new-feature
   ```
- **5. Open a Pull Request.**:
- For more details, check CONTRIBUTING.md.

## License
- This project is licensed under the GPL v3 License. For more details, see the LICENSE file.

## Acknowledgements
- Laravel Chatbot UI for the conversational interface.
- Vultr for cloud hosting and transcription services.
- Open Source libraries used in this project.

  
