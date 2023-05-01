import { ICCMSLayoutProps } from "./types";
import { CAuthenticate } from "../CAuthenticate";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDimension, useToggle } from "src/common/hooks";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { DRAWER_WIDTH, TABLET_BREAKPOINT } from "src/common/constants/layout";
import { cmsNavigations } from "src/routes/navigation";

export const CCMSLayout = ({ children }: ICCMSLayoutProps) => {
  const { isOpen, toggle, close } = useToggle();

  const { width } = useDimension();

  useEffect(() => {
    if (width > TABLET_BREAKPOINT) {
      close();
    }
  }, [width]);

  const container =
    typeof window !== undefined ? () => window.document.body : undefined;

  const drawer = (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" className="uppercase">
            {process.env.NEXT_PUBLIC_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <List>
        {cmsNavigations.map((nav) => (
          <ListItem key={nav.path}>
            <ListItemButton href={nav.path}>
              <ListItemText primary={nav.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <CAuthenticate>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { sm: `${DRAWER_WIDTH}px` },
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ display: { xs: "none", sm: "block" } }} />
          <Toolbar sx={{ display: { sm: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Bars3Icon width={20} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="uppercase"
            >
              {process.env.NEXT_PUBLIC_TITLE}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={isOpen}
            onClose={toggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DRAWER_WIDTH,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DRAWER_WIDTH,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <div>{children}</div>
      </Box>
    </CAuthenticate>
  );
};
