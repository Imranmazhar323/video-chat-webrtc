import React, { useContext } from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { SocketContext } from "../Context";

const UserList = () => {
  const { users } = useContext(SocketContext);

  return (
    <div>
      <Typography variant="h6">Connected Users</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name || user.id} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
