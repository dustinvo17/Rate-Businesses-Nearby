import React from "react"
import { Typography, Avatar } from "@material-ui/core"
export default function User({ user }) {
  return (
    <div>
      {user ? (
        <div style={{ display: "flex",alignItems: "center",margin:'15px 0'}}>
          <Avatar src={user.photoURL} style={{ marginRight: "10px" }} />
          <Typography variant="h6">{user.displayName}</Typography>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
