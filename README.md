Tech Stack : React, Typescript, Redux, Vite

Backend Stack will be explain in Backend Repository README.md

User Login needed to be seeded from data migration durinig backend service start. <br />
When Login with correct email and password it will be directed to otp verification page. <br />
OTP will be sent to email registered. make sure email is active and valid. <br />
When OTP verified successfully it will be redirected to Dashboard page. <br />

Login as ADMIN <br />
1 . Dashboard : Match scoring between candidate and job openings (filter score > 70 only and top 50 candidates with that higher score)
2. Create User : Create User for login
3. User List : User created list we can change the roles there.
4. Job : Menu for job openings we can delete the job also
5. Create Job: We can create the job from this menu

Login as RECRUITER <br />
1. Dashboard : Match scoring between candidate and job openings (filter score > 70 only and top 50 candidates with that higher score <br />
2. Create Candidate : to create candidate input name, email, phone and location <br />
3. Candidate : we can see all candidate created <br />
4. Upload CV : we can upload CV by choosing per user This uplad will extract skill, education and experience then fill it to user details <br />


step to run in local :

1. I'm using node version 22.15.0 make sure this is installed in your environment to avoid any problems in future <br />
2. run npm install <br />
3. run npm run dev <br />
4. run http://localhost: 5173 <br />
   



