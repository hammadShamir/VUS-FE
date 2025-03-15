## Frontend Environment Variables

### API Configuration
```ini
NEXT_PUBLIC_API_URL=your_backend_api_url # e.g., domain/api/v1
```

### web app's Firebase configuration
```ini
NEXT_PUBLIC_FIREBASE=firebase_config_file 
```

### Email Service
```ini
NEXT_PUBLIC_EMAIL_SERVICE_KEY=your_email_service_key # Email js service key
NEXT_PUBLIC_EMAIL_TEMPLATE_KEY=your_template_key # Email js Template key
NEXT_PUBLIC_EMAIL_PUBLIC_KEY=your_public_key # Email js Public key```


### Setup Instructions

### 1. Clone the repository:
```sh
git clone your_repository_url.git
```

### 2. Navigate to the project folder:
```sh
cd project_name
```

### 3. Install dependencies:
```sh
npm install
```

### 4. Set up the `.env` file:
- Create a `.env` file at the project root.  
- Copy and paste the provided environment variables.

### 5. Run the development server:
```sh
npm run dev
```

### 6. Build and deploy for production:
```sh
npm run build && npm run start
```

---

## Additional Notes
✅ Ensure all API keys are securely stored in a `.env` file and never hardcoded in the codebase.  
✅ Add `.env` to `.gitignore` to prevent accidental commits.  
✅ Verify that third-party services (e.g., Firebase, Stripe, Google APIs) are properly configured before going live.  
✅ Contact support if you encounter issues with any integrations.  

---