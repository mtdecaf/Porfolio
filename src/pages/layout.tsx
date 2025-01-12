import { useEffect } from "react";
import localFont from "next/font/local";
import Matter, { Events } from "matter-js";
import Head from "next/head";
import "./globals.css";

const moonglade = localFont({
  src: [
    { path: "../app/fonts/moongladeLight.ttf", weight: "100", style: "normal" },
    {
      path: "../app/fonts/moongladeRegular.ttf",
      weight: "400",
      style: "normal",
    },
    { path: "../app/fonts/moongladeBold.ttf", weight: "700", style: "bold" },
  ],
});

let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;
Events;

let engine = Engine.create();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const frame = document.getElementById("frame");

    if (frame) {
      const render = Render.create({
        element: frame,
        engine: engine,
        options: {
          width: frame.clientWidth,
          height: frame.clientHeight,
          wireframes: false,
        },
      });

      Render.run(render);

      const runner = Runner.create();
      Runner.run(runner, engine);

      // Create boundary bodies
      const boundaries = [
        Bodies.rectangle(frame.clientWidth / 2, -10, frame.clientWidth, 20, {
          isStatic: true,
        }), // top
        Bodies.rectangle(
          frame.clientWidth / 2,
          frame.clientHeight + 10,
          frame.clientWidth,
          20,
          { isStatic: true }
        ), // bottom
        Bodies.rectangle(-10, frame.clientHeight / 2, 20, frame.clientHeight, {
          isStatic: true,
        }), // left
        Bodies.rectangle(
          frame.clientWidth + 10,
          frame.clientHeight / 2,
          20,
          frame.clientHeight,
          { isStatic: true }
        ), // right
      ];

      Composite.add(engine.world, boundaries);

      // Add some bodies to the world

      // Add mouse control
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

      Composite.add(engine.world, mouseConstraint);

      // Keep the mouse in sync with rendering
      render.mouse = mouse;

      // Cleanup on component unmount
      return () => {
        Render.stop(render);
        Runner.stop(runner);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        render.canvas.remove();
        render.textures = {};
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>Jacky Cao</title>
      </Head>
      <div className="flex justify-center w-dvw h-dvh p-4 md:py-20 md:px-14 xl:px-auto">
        <div
          id="frame"
          className="border-4 border-black w-full xl:w-10/12 xl:max-w-screen-l h-full"
        >
          {children}
        </div>
      </div>
    </>
  );
}
