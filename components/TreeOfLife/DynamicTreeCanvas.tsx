"use client";

import { forwardRef } from "react";
import Tree, { type TreeProps } from "react-d3-tree";

const DynamicTreeCanvas = forwardRef<Tree, TreeProps>((props, ref) => (
  <Tree ref={ref} {...props} />
));

DynamicTreeCanvas.displayName = "DynamicTreeCanvas";

export default DynamicTreeCanvas;
