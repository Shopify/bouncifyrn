# BouncifyRN

[Ballz](https://itunes.apple.com/us/app/ballz/id1139609950) has enjoyed a lot of family competition in
our home. But the app is getting bloated with ads and I need a new side project. So I'm going to try and re-write
in React Native and see what happens. React Native isn't the best gaming plaform, it's probably going
to be terrible. But it will also be a fun test of the performance improvements coming in [Fabric](https://github.com/react-native-community/discussions-and-proposals/issues/4).

![Ballz img](https://is3-ssl.mzstatic.com/image/thumb/Purple111/v4/38/e0/de/38e0ded6-96be-9593-830c-3e5a11dcc44c/pr_source.png/300x0w.png)

## Quick Start iOS

```
git clone https://github.com/jmwind/bouncifyrn.git

cd bouncifyrn

npm install

react-native link

react-native run-ios
```

## TODOs

- [x] Get balls moving around the screen with grade 2 level math
- [x] Define and draw playing surface and limit movement within
- [x] Start ball from bottom on click with tail
- [x] Start angle touch motion calculation and display
- [x] Colision detection on box, bounce off
- [x] Colision angular velocity near object edges (irregular bounces)
- [x] Have balls stop and hide when they hit bottom surface
- [ ] Add ball addition hot spots on screen with nice animation
- [x] Colision count and box disappear
- [x] Top score section with ball count and level and layout
- [x] Show ball count beside first ball (on top for now)
- [x] Calculate level and display at top
- [x] Box bounce count calculation and display
- [ ] First ball landing spot calculation and animation
- [x] Add box layers and advancing
- [ ] Determine end of game when boxes advance to bottom row
- [ ] Add speed-up button
- [ ] Splash screen and icon
- [ ] Start scren
- [ ] End of game screen
- [x] Add cheat mode to add / remove balls for testing
- [ ] Fix all the crappy hard coded sizes and test on other device sizes
- [ ] Get with the times, go Typescript!
