export const search = {
  id: 'search for item',
  query: `
    query SearchItems($search: String) {
      searchItems(search: $search) {
        id
        name
        description
        value
      }
    }
  `,
  variables: { search: 'ure' },
  expected: {
    data: {
      searchItems: [
        {
          id: 3,
          name: 'Sculpture',
          description: 'Sculpture of great value',
          value: 1020000,
        },
      ],
    },
  },
}
