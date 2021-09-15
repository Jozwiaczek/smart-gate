---
to: src/icons/<%= h.changeCase.pascal(Name) %>Icon.tsx
---
import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const <%= h.changeCase.pascal(Name) %>Icon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
    <%- iconSource %>
)

const Composed = memo(forwardRef(<%= h.changeCase.pascal(Name) %>Icon));
Composed.displayName = '<%= h.changeCase.pascal(Name) %>Icon';

export default Composed;
