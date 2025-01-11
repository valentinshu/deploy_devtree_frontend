import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import { SocialNetwork, User } from "../types";

type Props = {};

function LinkTreeView({}: Props) {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();

  const user: User = queryClient.getQueryData(["user"])!;

  const links: SocialNetwork[] = JSON.parse(user.links);

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Actualizado Correctamente");
    },
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });

    setDevTreeLinks(updatedData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedItems: SocialNetwork[] = [];

    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === e.target.name) {
        if (e.target.value === "") {
          const indexToUpdate = links.findIndex(
            (link) => link.name === e.target.name
          );
          updatedItems = links
            .map((link) => {
              if (link.name === e.target.name) {
                return {
                  ...link,
                  id: 0,
                  enabled: false,
                  url: e.target.value,
                };
              } else if (link.id > indexToUpdate) {
                return { ...link, id: link.id - 1 };
              } else {
                return link;
              }
            })
            .filter((link) => link.url != "");

          // Almacenar en la base de datos
          queryClient.setQueryData(["user"], (prevData: User) => {
            return { ...prevData, links: JSON.stringify(updatedItems) };
          });

          return { ...link, url: e.target.value, enabled: false };
        }
        return { ...link, url: e.target.value };
      }
      return link;
    });

    setDevTreeLinks(updatedLinks);
  };

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url) || (link.url === "" && link.enabled)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no válida");
        }
      }
      return link;
    });

    setDevTreeLinks(updatedLinks);
    let updatedItems: SocialNetwork[] = [];
    const selectedSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork
    );
    if (selectedSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id > 0).length + 1;
      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id,
        };
        updatedItems = [...links, newItem];
      }
    } else {
      const linksEnabled = links
        .map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              id: 0,
              enabled: false,
            };
          }
          return link;
        })
        .filter((link) => link.enabled)
        .sort((a, b) => a.id - b.id)
        .map((link, index) => ({
          ...link,
          id: index + 1, // Reasignar IDs en secuencia
        }));

      const linksDisabled = links
        .map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              id: 0,
              enabled: false,
            };
          }
          return link;
        })
        .filter((link) => !link.enabled);
      updatedItems = [...linksDisabled, ...linksEnabled];
      const userRecent: User = queryClient.getQueryData(["user"])!;
      const linksRecent: SocialNetwork[] = JSON.parse(userRecent.links);

      updatedItems = updatedItems.sort(
        (a, b) =>
          linksRecent.findIndex((link) => link.name === a.name) -
          linksRecent.findIndex((link) => link.name === b.name)
      );
    }

    // Almacenar en la base de datos
    queryClient.setQueryData(["user"], (prevData: User) => {
      return { ...prevData, links: JSON.stringify(updatedItems) };
    });
  };
  const validateUpdateUser = () => {
    if (devTreeLinks.every((link) => isValidUrl(link.url) || link.url === "")) {
      mutate(queryClient.getQueryData(["user"])!);
    } else {
      toast.error("URL no válida");
    }
  };
  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
          onClick={validateUpdateUser}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  );
}

export default LinkTreeView;
