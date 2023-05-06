import { ICCMSLayoutProps } from "./types";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDimension, useToggle } from "src/common/hooks";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { DRAWER_WIDTH, TABLET_BREAKPOINT } from "src/common/constants/layout";
import { cmsNavigations } from "src/routes/navigation";
import { useSession } from "src/common/hooks/session.hook";
import { CSpinner } from "../../others/CSpinner";
import { initialHttp, setToken } from "src/utils/axios";
import { useRouter } from "next/router";
import { CMS_ROUTES } from "src/common/constants/routes";
import { CLink } from "../../others";

export const CCMSLayout = ({ children }: ICCMSLayoutProps) => {
  const { replace } = useRouter();

  const { isOpen, toggle, close } = useToggle();

  const { width } = useDimension();

  const [isInitial, setInitial] = useState<boolean>(true);

  const { get } = useSession();

  useLayoutEffect(() => {
    const initial = async () => {
      const res = await get("token");

      if (res.token) {
        setToken(res.token);

        initialHttp();

        setInitial(false);

        return;
      }

      replace(CMS_ROUTES.LOGIN.INDEX.path);
    };

    initial();
  }, []);

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
        <Toolbar className="justify-between">
          <Typography variant="h6" noWrap component="div" className="uppercase">
            {process.env.NEXT_PUBLIC_TITLE}
          </Typography>
          <CLink href={CMS_ROUTES.LOGOUT.INDEX.path}>
            <Button variant="contained" color="warning">
              {CMS_ROUTES.LOGOUT.INDEX.title}
            </Button>
          </CLink>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Divider />
      <List>
        {cmsNavigations.map((nav) => (
          <ListItem key={nav.path} sx={{ padding: 0 }}>
            <CLink
              href={nav.path}
              className="w-full px-4 py-2"
              activeClassName="bg-blue-200 font-semibold"
            >
              {nav.title}
            </CLink>
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (isInitial) {
    return (
      <Box
        component="div"
        className="w-full h-[100vh] flex justify-center items-center"
      >
        <CSpinner />
      </Box>
    );
  }

  return (
    <Box
      component="div"
      sx={{ display: "flex" }}
      className="bg-gray-100 min-h-[100vh]"
    >
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
          <Typography variant="h6" noWrap component="div" className="uppercase">
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

      <div className="flex-1 overflow-hidden py-6">
        <Toolbar />
        <Container maxWidth="lg">
          <Suspense fallback={<CSpinner />}>{children}</Suspense>
        </Container>
      </div>
    </Box>
  );
};
