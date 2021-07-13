import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';

function UserListItem({id, username, onClick, ...props}) {
    return (
        <ListItem button divider onClick={() => onClick(id)} {...props}>
            <ListItemText
                primary={username}
                secondary={id}
            />
        </ListItem>
    );
}

export default UserListItem;