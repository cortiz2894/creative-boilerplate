"use client";

const MARK_SIZE = 20;
const MARK_THICKNESS = 1;
const MARK_COLOR = "var(--color-border-light, #5c5854)";
const MARK_OFFSET = 16;

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

function CornerMark({ corner }: { corner: Corner }) {
  const isTop = corner.startsWith("top");
  const isLeft = corner.endsWith("left");

  return (
    <div
      style={{
        position: "absolute",
        width: MARK_SIZE,
        height: MARK_SIZE,
        top: isTop ? MARK_OFFSET : undefined,
        bottom: !isTop ? MARK_OFFSET : undefined,
        left: isLeft ? MARK_OFFSET : undefined,
        right: !isLeft ? MARK_OFFSET : undefined,
        borderColor: MARK_COLOR,
        borderStyle: "solid",
        borderTopWidth: isTop ? MARK_THICKNESS : 0,
        borderBottomWidth: !isTop ? MARK_THICKNESS : 0,
        borderLeftWidth: isLeft ? MARK_THICKNESS : 0,
        borderRightWidth: !isLeft ? MARK_THICKNESS : 0,
        opacity: 0.5,
      }}
    />
  );
}

export default function OverlayCornerMarks() {
  return (
    <>
      <CornerMark corner="top-left" />
      <CornerMark corner="top-right" />
      <CornerMark corner="bottom-left" />
      <CornerMark corner="bottom-right" />
    </>
  );
}
