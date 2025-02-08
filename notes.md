# CS 260 Notes

## HTML

-

## CSS

-   To make a button into an image or svg, do this:

```html
<button><img src="/path/to/image" />Words showup if you put them here</button>
```

--OR--

```html
<style>
    .img_button {
        background-image: url(/path/to/image);
    }
</style>

<button class="img-button"></button>
```

## React

-   Its best to just make it all a component and throw the component into the
    App() with the router wrapping it all.
-   For some reason returning multiple components requires you to do the thing
    at src/home/Home (couldnt copy paste for some reason looooool)
-   I made some constants for the password and email, but now i cant see any
    input into those fields. But i did make it a form with a navigation change.
-   A lot of docs i see use useState. I dont understand state in react and im
    sure I'll hate it just like i hate routing.

TODO: Make it better for mobile. Makethe request/response explorer nicer. Figure
out what im doing with the plus buttons. Maybe make the builder collapsable
