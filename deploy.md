``` how to deploy in aws using nginx backend ```
# Backend
    - install dependency :- npm install

    - allowed ec2 instance public IP on Mongodb server

``` pm2 install for backend server everytime run ```

    - install:- npm install pm2 -g 

    - run server:-  pm2 start npm -- start

    - check server :- pm2 log

    - server list :- pm2 list

    - pm2 flush <name>

    - stop server :- pm2 stop <name>

    - delete process :- pm2 delete <name>

    - if create process custome name :- pm2 start npm --name "process-name" -- start.

    - config nginx - sudo nano /etc/nginx/sites-available/default

    - restart nginx - sudo systemctl restart nginx

    - Modify the BASEURL in frontend project to "/api"


    # Ngxinx config: 

        nginx config : 

        server_name 16.171.11.204;

        location /api/ {
            proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }


``` How to purchase a domain name and connect it in your website ```
    - go to any domain provider website
    - 