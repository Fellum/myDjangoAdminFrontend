export default [
    {
      name: 'Genre',
      plural: 'Genres',
      fields: {
        id: {type: 'string', editable: false},
        name: {type: 'string', editable: true},
        description: {type: 'string', editable: true},
      },
      baseUrl: '/genres',
      infoView: {
        defaultField: 'name'
      }
    },
    {
      name: 'Type',
      plural: 'Types',
      fields: {
        id: {type: 'string', editable: false},
        name: {type: 'string', editable: true},
        description: {type: 'string', editable: true},
      },
      baseUrl: '/types',
      infoView: {
        defaultField: 'name'
      }
    },
    {
        name: 'Episode',
        plural: 'Episodes',
        fields: {
          id: {type: 'string', editable: false},
          name: {type: 'string', editable: true},
          description: {type: 'string', editable: true},
          num: {type: 'number', editable: true},
          title: {type: 'entity', entity: 'Title', editable: true}
        },
        baseUrl: '/episodes',
        infoView: {
          defaultField: 'name'
        }
      },
    {
      name: 'Title',
      plural: 'Titles',
      fields: {
        id: {type: 'string', editable: false},
        name: {type: 'string', editable: true},
        description: {type: 'string', editable: true},
        type: {type: 'entity', entity: 'Type', editable: true},
        genres: {type: 'entity[]', entity: 'Genre', editable: true, idsName: 'genreIds'}
      },
      baseUrl: '/titles',
      infoView: {
        defaultField: 'name'
      }
    }
]
