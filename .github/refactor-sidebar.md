# Refactor the sidebar in webapp

Right now the sidebar is displaying the link to the account settings, and the list of todolists, with a button to create a new todolist.

We need to refactor the sidebar to:
1. Display a loginapp logo at the top
2. Below, the list of todolists. When there are no todolists, it should display a message saying "No todolists found. Create one to get started."
3. Below the list of todolists, the menu links with 2 elements: Home and Account Settings.

You can use the playwright MCP to check how the sidebar is looking and iterate.