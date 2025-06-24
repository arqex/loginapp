# Reorganization of the web app

The webapp was a some point having 2 different applications, one for the unauthenticated screens and other of the authenticated ones.

Every app lived in its own folder and had its own router. But know we have moved the unauthenticated screens to the common screens folders, and their imports are wrong.

We want all the screens to work in the same way, in the same folder and with the same router.
