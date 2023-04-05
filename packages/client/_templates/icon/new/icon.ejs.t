---
to: src/icons/<%= h.changeCase.pascal(Name) %>Icon.tsx
---
import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const <%= h.changeCase.pascal(Name) %>Icon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
    <svg
      aria-labelledby="<%= h.changeCase.param(Name) %>"
      data-icon="<%= h.changeCase.param(Name) %>"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <title id="<%= h.changeCase.param(Name) %>"><%= h.changeCase.sentence(Name) %> icon</title>
    </svg>
)

const Composed = memo(forwardRef(<%= h.changeCase.pascal(Name) %>Icon));
Composed.displayName = '<%= h.changeCase.pascal(Name) %>Icon';

export default Composed;
