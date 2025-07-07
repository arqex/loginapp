# HOC for screens that only work when not authenticated

We have a HOC called `withAuth` that when wrapping a screen it makes sure that the user is authenticated and the context data is loaded before rendering the screen.

We need to create a new HOC called `withUnauth` that does the opposite: if the user is authenticated it redirects to the home screen, otherwise it renders the wrapped screen.



