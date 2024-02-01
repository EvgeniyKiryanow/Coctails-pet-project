// import { createUserWithEmailAndPassword } from 'firebase/auth';

// export default function() {
//   const { $auth } = useNuxtApp();

//   const user = useState("fb_user", () => null);

//   const registerUser = async (email, password) => {
//     try {
//       const userCreds = await createUserWithEmailAndPassword($auth, email, password);
//       if (userCreds) {
//         user.value = userCreds.user;
//         return true;
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         // handle error
//       }
//       return false;
//     }
//     return false;
//   };

//   return {
//     user,
//     registerUser
//   };
// }
// useFirebaseAuth.js

import { createUserWithEmailAndPassword } from 'firebase/auth';

export function useFirebaseAuth() {
  const { $auth } = useNuxtApp();

  const user = useState("fb_user", () => null);

  const registerUser = async (email, password) => {
    try {
      const userCreds = await createUserWithEmailAndPassword($auth, email, password);
      if (userCreds) {
        user.value = userCreds.user;
        return true;
      }
    } catch (error) {
      if (error instanceof Error) {
        // handle error
      }
      return false;
    }
    return false;
  };

  return {
    user,
    registerUser
  };
}
