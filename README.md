
<div align="center">
    <img src="https://res.cloudinary.com/sharath-media-library/image/upload/v1653581502/social%20media/sm-logo_ukggxg.png" alt="social media">


   # [SocialEase](https://social-ease.vercel.app/)
SocialEase is a Full Stack Social Media Application where you can find new people, connect, share your beautiful moments and do much more. Completely Mobile Responsive Application. Features, tech-stack and everything are listed below.
  
  
</div>

#### Stack Used

- React
- Firebase : 
  - Authentication : To Login and Signup Users
  - Firestore Database : To store users and posts information
  -  Firebase Storage - To Upload images
- Javascript

#### Tools and Additional Framework :
- TailwindCSS
- Redux Toolkit 
- Redux Thunk
- React Router v6
- React Toastify
- React Icons

#### How To Run in Local - 
Run these commands in your terminal
 ```
 git clone https://github.com/sharathnair9999/Social-Ease.git
 cd ./Social-Ease
 npm install
```

- Go To [Firebase](https://firebase.google.com/)
- Create A Project [refer here](https://www.youtube.com/watch?v=2yNyiW_41H8)
- Add `.env` file to the root directory
- Place all your app related keys from the created firebase project and place it in the `.env` as below 

```
REACT_APP_API_KEY=<your key>
REACT_APP_AUTH_DOMAIN=<your domain>
REACT_APP_PROJECT_ID=<your project id>
REACT_APP_STORAGE_BUCKET=<your storage bucket>
REACT_APP_MESSAGING_SENDER_ID=<your sender id>
REACT_APP_APP_ID= <your app id>
```
After that Run in your local with this command. 

`npm start`

And now this application runs in your local machine too. 

# Features

## Authentication: 

### User Signup 

- Upload DP(optional)
- First Name 
- Last Name 
- Set a username ( checks as you type if username exists or not : debounced search)
- User Login (Email, Password || Sign In With Google)
- Logout
- Protected Routes
- Public Routes

### Public Routes

- Explore Posts
- Single Post Page
- All People Listed Page - user related features tried will redirect the user to login page
- User Profile Page
- Login
- Signup

### Private Routes
- User Feed (Contains only posts from people you follow)
- Bookmarks (Only Logged Users)
- Liked Posts ( only Logged Users)

### User Related Operations
- Create A post with or without image
- Update Post
- Delete Post
- Like / Remove Like from Post
- Comment on a post ( Can be editted by commenter, Can be deleted by commenter/post author)
- Share a post (Copies the post URL to Clipboard)
- Search for a user by their username ( debounced search implementation )
- Add/Remove post To/From Bookmarks
- Follow/ Unfollow a user
- Edit logged in user's profile details such as name , username, bio, portfolio link, DP, Cover Photo
- Logged In User's Bookmarks and Liked Posts Listed on Profile Page
- Relevant Toast Messages on success or error of certain functionalities

## Sample Pictures of UI for reference 

![image](https://user-images.githubusercontent.com/61535475/172687598-808a75ef-2130-4c9d-b297-24743f934141.png)

![image](https://user-images.githubusercontent.com/61535475/172687645-ddc75f1e-405c-4df0-93b5-79fea52ba98a.png)

![image](https://user-images.githubusercontent.com/61535475/172687707-86af5000-474a-49c0-85d5-63de63ec84e5.png)

![image](https://user-images.githubusercontent.com/61535475/172687899-3865c70c-d629-4673-ad5b-c1e9c0619fb3.png)

![image](https://user-images.githubusercontent.com/61535475/172688353-d2b7beeb-2f0d-43f9-8796-0538b433053d.png)

![image](https://user-images.githubusercontent.com/61535475/172688647-75a47e02-9877-444a-a9d9-0123c73475b8.png)

![image](https://user-images.githubusercontent.com/61535475/172688785-62849fc2-4320-4456-b437-855c99990c33.png)



