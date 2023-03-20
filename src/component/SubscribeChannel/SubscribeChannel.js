import { KeyboardArrowDown } from '@mui/icons-material';
import { Avatar, Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

function SubscribeChannel({ title, data, MyListItemButton }) {
    return (
        <Box>
            <List>
                <Typography ml={4} variant="body1">
                    {title}
                </Typography>
                {data.map((item, index) => (
                    <Box key={index}>
                        <ListItem sx={{ marginTop: '0px', padding: '0', pl: '16px' }}>
                            <MyListItemButton>
                                <ListItemIcon>
                                    <Avatar
                                        sx={{ width: '32px', height: '32px' }}
                                        src={item.linkAvatar}
                                        alt={item.name}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </MyListItemButton>
                        </ListItem>
                    </Box>
                ))}
                <ListItem>
                    <MyListItemButton>
                        <ListItemIcon sx={{ color: '#0f0f0f' }}>
                            <KeyboardArrowDown />
                        </ListItemIcon>
                        <ListItemText primary="Hiên thị tât cả" />
                    </MyListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}

export default SubscribeChannel;
