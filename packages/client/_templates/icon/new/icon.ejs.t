---
to: src/icons/<%= h.changeCase.pascal(Name) %>Icon.tsx
---
import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const <%= h.changeCase.pascal(Name) %>Icon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
    <%- iconSource %>
)

export default memo(forwardRef(<%= h.changeCase.pascal(Name) %>Icon));
