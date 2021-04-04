export const SIGNUP = 'SIGNUP';
export const LOGIN ='LOGIN';

//signup with firebase function
export const signup = (email, password) => {
    return async dispatch => {
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCp82HA18651XcHfTSJbCY4lPueN2s4l30',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
          );

          if (!response.ok) {
            const errorResData = await response.json();
            const errorId= errorResData.error.message;
            let message = 'Somthing went worng';
            if(errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!';
            } 
            throw new Error(message)
        }  
          const resData = await response.json();
         fetch(`https://scrumaster-702cc-default-rtdb.europe-west1.firebasedatabase.app/users/${resData.localId}.json`,
          {
              method:'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userId: resData.localId,
                projectId: '',
                taskId: '',
                permission: '',
                name: '',
              })
          }
        );
        dispatch({ type: SIGNUP, token: resData.idToken , userId: resData.localId});
       };
    };


export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCp82HA18651XcHfTSJbCY4lPueN2s4l30',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
            })
        }
        );
    
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId= errorResData.error.message;
            let message = 'Somthing went worng';
            if(errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD'){
                message = 'This Password is not valid!';
            }
            throw new Error(message)
        }    
        const resData = await response.json();
        dispatch({ type: LOGIN, token: resData.idToken , userId: resData.localId});
    };
    };
    
