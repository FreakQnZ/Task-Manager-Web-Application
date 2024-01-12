
# Getting Started

This is a Task Manager built with Next.js and deployed on vercel.
you can visit the site from the following link : https://task-manager-web-application-nine.vercel.app/

It can perform your usual CRUD operations but what sets it apart from your usual task manager application are its unique features as follows





## Features

- Robust authentication
- Light/dark mode toggle
- Label tasks as important
- archive tasks
- Menu's for different views
- Live previews
- Responsive Design



## Run Locally

Clone the project

```bash
  git clone https://github.com/FreakQnZ/Task-Manager-Web-Application.git
```

If you are not in the project directory go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

add the following in you .env.local file

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= xyz (get from clerk.com) 
CLERK_SECRET_KEY= xyz (get from clerk.com)
NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL='/'
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL='/'
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL='/sign-in'
MONGO_URI="Cloud mongo DB server uri"
```

Start the server

```bash
  npm run dev
```


## Feedback

If you have any feedback, please reach out at anuraag.srivatsa123@gmail.com

