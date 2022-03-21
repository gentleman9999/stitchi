import React from 'react'
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Menu,
  IconButton,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
  Logo,
} from '@components/ui'
import { MenuIcon } from '@components/icons'
import Link from 'next/link'
import routes from '@lib/routes'

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] =
    React.useState<HTMLButtonElement | null>(null)
  const [anchorElUser, setAnchorElUser] =
    React.useState<HTMLButtonElement | null>(null)

  const handleOpenNavMenu: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const ClickableLogo = (props: { width: number }) => (
    <Link href={routes.internal.home.href()}>
      <a>
        <Logo style={{ width: props.width }} />
      </a>
    </Link>
  )

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <ClickableLogo width={60} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link passHref href={routes.internal.products.href()}>
                  <Typography textAlign="center" component="a">
                    Products
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <ClickableLogo width={55} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link passHref href={routes.internal.products.href()}>
              <Button
                Component="a"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Products
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link passHref href={routes.internal.api.auth.logout.href()}>
                  <Typography textAlign="center">Logout</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navigation
