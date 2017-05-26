# collpoll-task

```bash
npm install
npm test
npm start
```

### APIs
> 1. **to get near by users :**
* **url** : /nearByUsers
* **method** : `get`
* **Success Response:**
  * **Code:** `200` <br />
  *  **Body** :
    ```javascript
    {
       "customers":[
          {
             "name":"Mohamed Coughran",
             "id":"Skl1lNf8W-",
             "distance":12.127576526023072
          },
          {
             "name":"Mohamed Coughran",
             "id":"SyygNGLZZ",
             "distance":14.511767045147835
          }
       ]
    }
    ```
* **error Response:**
  * **Code:** 500 <br />
    **Body:** :
    ```javascript
    { "error" : "Internal server error" }
    ```

    </br>
    </br>

> 2. **to create customer.json file :**
* **url** : /nearByUsers
* **method** : `get`
* **request body**:
```javascript
{
	"limit" : 1000,
    "inRadiusLimit" : 200
}
```
* **Success Response:**
  * **Code:** `200` <br />
  *  **Body** :
    ```javascript
  [
        {
            "name": "Lorie Alvacado",
            "id": "HkDBLXIZ-",
            "latitude": "12.9350831227",
            "longitude": "77.61439"
        },
        {
            "name": "Jeri Millican",
            "id": "HklwB87UbW",
            "latitude": "12.9351808889",
            "longitude": "77.61426"
        }
  ]
    ```
* **error Response:**
  * **Code:** 500 <br />
  * **Body:** :
    ```javascript
    { "error" : "Internal server error" }
    ```
    