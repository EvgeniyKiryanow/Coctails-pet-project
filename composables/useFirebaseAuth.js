import { createUserWithEmailAndPassword } from 'firebase/auth';

export function useFirebaseAuth() {
  const { $auth } = useNuxtApp();

  const user = useState("fb_user", () => null);
  const registerUser = async (email, password) => {
    try {
      const userCreds = await createUserWithEmailAndPassword($auth, email, password);
      if (userCreds) {
        return userCreds; 
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('Error log')
      }
    }
    return null; 
  };

  return {
    user,
    registerUser
  };
}
