``` how to deploy in aws using nginx backend ```
# Backend
    - install dependency :- npm install
    - allowed ec2 instance public IP on Mongodb server
    - install:- npm install pm2 -g
    - run server:-  pm2 start npm -- start
    - check server :- pm2 log
    - server list :- pm2 list
    - pm2 flush <name>
    - stop server :- pm2 stop <name>
    - delete process :- pm2 delete <name>
    - if create process custome name :- pm2 start npm --name "process-name" -- start.
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"
