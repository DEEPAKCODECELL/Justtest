import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthRole = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem("role");
        setRole(storedRole);
      } catch (error) {
        console.error("Error fetching role:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, []);

  return { role, isLoading };
};

export default useAuthRole;
