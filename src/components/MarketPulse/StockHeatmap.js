import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';

/**
 * StockHeatmap renders a zoomable treemap by sector → stocks.
 * - Color encodes percent change (green up, red down)
 * - Click sector to zoom into sector; click background to zoom out
 * - Responsive SVG fits parent width
 */
const StockHeatmap = ({
  data,
  height = 380,
}) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [width, setWidth] = useState(800);
  const [currentNode, setCurrentNode] = useState(null);

  // Resize observer to make SVG responsive to container width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const resize = () => setWidth(el.clientWidth);
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const root = useMemo(() => {
    const stratified = d3
      .hierarchy(data)
      .sum((d) => (d && typeof d.value === 'number' ? d.value : 0))
      .sort((a, b) => (b.value || 0) - (a.value || 0));
    return stratified;
  }, [data]);

  const color = useMemo(() => {
    // domain -10%..+10%
    return d3.scaleLinear().domain([-10, 0, 10]).range(['#ef4444', '#374151', '#22c55e']);
  }, []);

  const treemapLayout = useMemo(() => d3.treemap().paddingInner(10).round(true), []);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g');

    const draw = (node) => {
      const rootNode = node || root;
      // re-run layout with current size
      treemapLayout.size([width, height])(rootNode);

      const leaves = rootNode.leaves();

      // Draw blocks
      const blocks = g.selectAll('g.block').data(leaves, (d) => d.data.name);
      const blocksEnter = blocks.enter().append('g').attr('class', 'block');

      blocksEnter
        .append('rect')
        .attr('rx', 12)
        .attr('ry', 12)
        .attr('fill', (d) => color(d.data.change || 0))
        .attr('stroke', 'rgba(255,255,255,0.35)')
        .attr('stroke-width', 1.5)
        .attr('filter', 'url(#drop)');

      blocksEnter
        .append('text')
        .attr('fill', 'white')
        .attr('font-weight', 600)
        .attr('font-size', 13)
        .attr('pointer-events', 'none')
        .text((d) => d.data.name);

      const merged = blocksEnter.merge(blocks);

      merged
        .transition()
        .duration(300)
        .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

      merged
        .select('rect')
        .transition()
        .duration(300)
        .attr('width', (d) => Math.max(0, d.x1 - d.x0))
        .attr('height', (d) => Math.max(0, d.y1 - d.y0));

      merged
        .select('text')
        .transition()
        .duration(300)
        .attr('x', 12)
        .attr('y', 22)
        .tween('text-visibility', function (d) {
          const el = d3.select(this);
          return () => {
            const w = Math.max(0, d.x1 - d.x0);
            const h = Math.max(0, d.y1 - d.y0);
            el.attr('opacity', w > 60 && h > 28 ? 1 : 0);
          };
        });

      blocks.exit().remove();
    };

    // defs: drop shadow
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'drop').attr('height', '130%');
    filter
      .append('feDropShadow')
      .attr('dx', 0)
      .attr('dy', 4)
      .attr('stdDeviation', 8)
      .attr('flood-opacity', 0.25);

    draw(currentNode || root);

    // Zoom interaction: click background to reset
    svg.on('click', (event) => {
      if (event.target === svg.node()) {
        setCurrentNode(null);
      }
    });

    // Click to zoom by sector
    svg.selectAll('g.block').on('click', (event, d) => {
      event.stopPropagation();
      // find parent group (sector) if exists
      if (d.parent && d.parent.depth > 0) {
        setCurrentNode(d.parent.copy());
      }
    });

    return () => {
      svg.on('click', null);
    };
  }, [root, width, height, color, treemapLayout, currentNode]);

  return (
    <div ref={containerRef} className="w-full">
      <svg ref={svgRef} width={width} height={height} className="w-full h-auto rounded-xl" />
      <div className="mt-2 text-xs dark:text-white text-black opacity-70">
        Click a block to zoom into its sector. Click outside blocks to reset.
      </div>
    </div>
  );
};

export default StockHeatmap;



