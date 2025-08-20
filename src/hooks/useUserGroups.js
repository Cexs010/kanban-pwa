import { useState, useEffect } from "react";
import { auth } from "../services/firebase/firebase";
import { groupService } from "../services/firebase/groupFirebase";

export const useUserGroups = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(true);

  useEffect(() => {
    const loadUserGroups = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setIsLoadingGroups(true);
          const groups = await groupService.getUserGroups(user.uid);
          setUserGroups(groups);
        } else {
          setUserGroups([]);
        }
      } catch (error) {
        console.error("Error cargando grupos del usuario:", error);
        setUserGroups([]);
      } finally {
        setIsLoadingGroups(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadUserGroups();
      } else {
        setUserGroups([]);
        setIsLoadingGroups(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const addGroup = (newGroup) => {
    setUserGroups((prevGroups) => [newGroup, ...prevGroups]);
  };

  return {
    userGroups,
    setUserGroups, 
    isLoadingGroups,
    addGroup,
  };
};
