export const cloudinarySignature = {
  id: 'should generate signature',
  query: `
    query getSignature($publicId: String!) {
      getSignature(publicId: $publicId) {
        signature
        timestamp
      }
    } 
  `,
  variables: { publicId: 'john-doe' },
  expected: {
    data: {
      getSignature: {
        signature: 'c67155ec186b5c8cee07d3816af6f217b46a249a',
        timestamp: 1615369551,
      },
    },
  },
};
