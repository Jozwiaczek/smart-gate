---
inject: true
to: src/App.tsx
before: </Admin>
---
<Resource
      name="<%= h.changeCase.camel(Name) %>"
      <%- types.map(type =>`${h.changeCase.camel(type)}={${h.changeCase.pascal(Name)}${type}}`).join("\n")%>
/>
