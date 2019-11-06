# nginx-sub-to-path-poc
Proxy a subdomain slug to service path POC

### setup:

1. need to have installed:
    
    `docker`
    
    `docker-compose`
    
    `node 10 >` && (`npm` || `yarn`)
2. edit your `/etc/hosts` file and add the following entry:

        127.0.0.1       account-slug.example.com

3. run `npm install`   ||   `yarn install`
4. run `npm run dev`   ||   `yarn dev`

### testing:

1. make a GET request to: `account-slug.example.com:8080` 
2. you will see that its proxied to: `127.0.0.1:3001/base/account-slug/test`
3. body should return 
    ```json
        {
            "params": {
                "slug":"account-slug"
            }
        }
    ```

Notes: 

- Because `/etc/hosts` does not support wildcards, this would only work locally with the
domain `account-slug.example.com`.