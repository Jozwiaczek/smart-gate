---
inject: true
to: src/elements/index.ts
before: </Admin>
---
<Resource
      name="<%= h.changeCase.camel(Name) %>"
      <%- types.map(type =>`${h.changeCase.camel(type)}={Admins${type}}`).join("\n")%>
/>
