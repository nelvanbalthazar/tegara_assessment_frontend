Tech Stack : React, Typescript, Redux, Vite

Backend Stack will be explain in Backend Repository README.md

User Login needed to be seeded from data migration durinig backend service start.
When Login with correct email and password it will be directed to otp verification page
OTP will be sent to email registered. make sure email is active and valid. 
When OTP verified successfully it will be redirected to Dashboard page.

Login as ADMIN menu
Dashboard : Match scoring between candidate and job openings (filter score > 70 only and top 50 candidates with that higher score)
Create User : Create User for login
User List : User created list we can change the roles there.
Job : Menu for job openings we can delete the job also
Create Job: We can create the job from this menu

Login as RECRUITER menu
Dashboard : Match scoring between candidate and job openings (filter score > 70 only and top 50 candidates with that higher score
Create Candidate : to create candidate input name, email, phone and location
Candidate : we can see all candidate created
Upload CV : we can upload CV by choosing per user This uplad will extract skill, education and experience then fill it to user details


step to run in local :

1. I'm using node version 22.15.0 make sure this is installed in your environment
2. run npm install
3. run npm run dev
4. run http://localhost: 5173
   



