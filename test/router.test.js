const expect = require('chai').expect
const SpaRouter = require('../src/router').SpaRouter
const navigateTo = require('../src/router').navigateTo
const currentRoute = require('../src/router').currentRoute

let testRouter = null
let pathName = '/'
let routes = []

describe('Router', () => {
  describe('When route does not exist', () => {
    beforeEach(() => {
      testRouter = SpaRouter({ routes: [], pathName })
    })

    it('should set the component', () => {
      expect(testRouter.activeRoute.component).to.equal('')
    })

    it('should set the route name to 404', () => {
      expect(testRouter.activeRoute.name).to.equal('404')
    })

    it('should set the route path to 404', () => {
      expect(testRouter.activeRoute.path).to.equal('404')
    })
  })

  describe('When route does not exist and there is a pathname', () => {
    beforeEach(() => {
      testRouter = SpaRouter({
        routes,
        pathName: '/this/route/does/not/exist'
      })
    })

    it('should set thecomponent', () => {
      expect(testRouter.activeRoute.component).to.equal('')
    })

    it('should set the route name to 404', () => {
      expect(testRouter.activeRoute.name).to.equal('404')
    })

    it('should set the route path to 404', () => {
      expect(testRouter.activeRoute.path).to.equal('404')
    })
  })

  describe('When there are valid routes no nesting', () => {
    beforeEach(() => {
      routes = [
        {
          name: '/',
          component: 'PublicLayout',
          nestedRoutes: [{ name: 'index', component: 'PublicIndex' }, { name: 'about-us', component: 'AboutUs' }]
        },

        { name: 'login', component: 'Login' },
        { name: 'project/:name', component: 'ProjectList' }
      ]
    })

    describe('When root path', () => {
      beforeEach(() => {
        pathName = '/'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path to root path', () => {
        expect(testRouter.activeRoute.path).to.equal('/')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('PublicLayout')
      })

      it('should set path to root path', () => {
        expect(testRouter.activeRoute.path).to.equal('/')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].component).to.equal('PublicIndex')
      })
    })

    describe('When empty root path', () => {
      beforeEach(() => {
        pathName = ''
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path to root path', () => {
        expect(testRouter.activeRoute.path).to.equal('/')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('PublicLayout')
      })
    })

    describe('When path is first level', () => {
      beforeEach(() => {
        pathName = '/login'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path to root path', () => {
        expect(testRouter.activeRoute.path).to.equal('/login')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('Login')
      })
    })
  })

  describe('When there are valid routes no nesting with named params', () => {
    beforeEach(() => {
      routes = [
        {
          name: '/',
          component: 'PublicIndex'
        },
        { name: 'login', component: 'Login' },
        { name: 'project/:name', component: 'ProjectList' },
        {
          name: '/about-us',
          component: 'AboutUsLayout',
          nestedRoutes: [{ name: 'index', component: 'AboutUsPage' }]
        }
      ]
    })

    describe('When path is first level', () => {
      beforeEach(() => {
        pathName = '/project/easy-routing'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path to root path', () => {
        expect(testRouter.activeRoute.path).to.equal('/project/easy-routing')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('ProjectList')
      })

      it('should set named params', () => {
        expect(testRouter.activeRoute.params.name).to.equal('easy-routing')
      })
    })

    describe('When top level layout with index', () => {
      beforeEach(() => {
        pathName = '/about-us'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path to root path', () => {
        expect(testRouter.activeRoute.path).to.equal('/about-us')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('AboutUsLayout')
      })

      it('should set named params', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].component).to.equal('AboutUsPage')
      })
    })

    describe('When top level layout with index', () => {
      beforeEach(() => {
        pathName = '/about-us/'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path to root path', () => {
        expect(testRouter.activeRoute.path).to.equal('/about-us')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('AboutUsLayout')
      })

      it('should set named params', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].component).to.equal('AboutUsPage')
      })
    })

    describe('When top level layout with index and wrong address', () => {
      beforeEach(() => {
        pathName = '/about-us/pepe'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set the route name to 404', () => {
        expect(testRouter.activeRoute.name).to.equal('404')
      })

      it('should set the route path to 404', () => {
        expect(testRouter.activeRoute.path).to.equal('404')
      })
    })
  })

  describe('When there are valid routes no nesting with more than one named params', () => {
    beforeEach(() => {
      routes = [
        {
          name: '/',
          component: 'PublicIndex'
        },
        { name: 'login', component: 'Login' },
        { name: 'project/:name/:date', component: 'ProjectList' }
      ]
    })

    describe('When path is first level', () => {
      beforeEach(() => {
        pathName = '/project/easy-routing/2019-03-26'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path to root path', () => {
        expect(testRouter.activeRoute.path).to.equal('/project/easy-routing/2019-03-26')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('ProjectList')
      })

      it('should set named params', () => {
        expect(testRouter.activeRoute.params.name).to.equal('easy-routing')
      })

      it('should set named params', () => {
        expect(testRouter.activeRoute.params.date).to.equal('2019-03-26')
      })
    })
  })

  describe('When there are namespaced routes', () => {
    beforeEach(() => {
      routes = [
        {
          name: '/',
          component: 'PublicLayout',
          nestedRoutes: [{ name: 'index', component: 'PublicIndex' }, { name: 'about-us', component: 'AboutUs' }]
        },

        { name: 'login', component: 'Login' },
        {
          name: 'admin',
          component: 'AdminLayout',
          nestedRoutes: [
            { name: 'index', component: 'AdminIndex' },
            {
              name: 'employees',
              nestedRoutes: [
                { name: 'index', component: 'EmployeesIndex' },
                {
                  name: 'show/:id/:full-name',
                  component: 'ShowEmployee'
                }
              ]
            }
          ]
        }
      ]
    })
    describe('When path is nested with named params', () => {
      let showEmployeeRoute
      let activeRoute
      beforeEach(() => {
        pathName = '/admin/employees/show/12/Danny-filth'
        testRouter = SpaRouter({ routes, pathName })
        activeRoute = testRouter.activeRoute
        const employeeRoute = activeRoute.nestedRoutes[0]
        showEmployeeRoute = employeeRoute.nestedRoutes[0]
      })

      it('should set path to root path', () => {
        expect(activeRoute.path).to.equal('/admin/employees/show/12/Danny-filth')
      })

      it('should set component name', () => {
        expect(showEmployeeRoute.component).to.equal('ShowEmployee')
      })

      it('should set named params', () => {
        expect(showEmployeeRoute.params.id).to.equal('12')
      })

      it('should set named params', () => {
        expect(showEmployeeRoute.params['full-name']).to.equal('Danny-filth')
      })
    })
  })

  describe('When there are nested routes', () => {
    beforeEach(() => {
      routes = [
        {
          name: '/',
          component: 'PublicLayout',
          nestedRoutes: [{ name: 'index', component: 'PublicIndex' }, { name: 'about-us', component: 'AboutUs' }]
        },

        { name: 'login', component: 'Login' },
        {
          name: 'admin',
          component: 'AdminLayout',
          nestedRoutes: [
            { name: 'index', component: 'AdminIndex' },
            {
              name: 'employees',
              nestedRoutes: [
                { name: 'index', component: 'EmployeesIndex' },
                {
                  name: 'show/:id/:full-name',
                  component: 'ShowEmployee'
                }
              ]
            }
          ]
        }
      ]
    })

    describe('Admin route', () => {
      beforeEach(() => {
        pathName = '/admin'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path to root path', () => {
        expect(testRouter.activeRoute.path).to.equal('/admin')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('AdminLayout')
      })
    })

    describe('Employees route', () => {
      beforeEach(() => {
        pathName = '/admin/employees'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path', () => {
        expect(testRouter.activeRoute.path).to.equal('/admin/employees')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('AdminLayout')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.nestedRoutes.length).to.equal(1)
      })

      it('should set nested component name', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].nestedRoutes[0].component).to.equal('EmployeesIndex')
      })

      it('should set nested component name', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].component).to.be.undefined
      })
    })

    describe('Employee show route', () => {
      beforeEach(() => {
        pathName = '/admin/employees/show'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path', () => {
        expect(testRouter.activeRoute.path).to.equal('/admin/employees/show')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('AdminLayout')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.nestedRoutes.length).to.equal(1)
      })

      it('should set nested component name', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].component).to.be.undefined
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].nestedRoutes.length).to.equal(1)
      })

      it('should set nested component name', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].nestedRoutes[0].component).to.equal('ShowEmployee')
      })
    })
  })

  describe('When there are nested routes with named params', () => {
    beforeEach(() => {
      routes = [
        {
          name: '/',
          component: 'PublicIndex'
        },
        { name: 'login', component: 'Login' },
        { name: 'signup', component: 'SignUp' },
        {
          name: 'admin',
          component: 'AdminIndex',
          nestedRoutes: [
            {
              name: 'employees',
              component: 'EmployeesIndex',
              nestedRoutes: [
                {
                  name: 'show/:id',
                  component: 'ShowEmployee'
                }
              ]
            }
          ]
        }
      ]
    })

    describe('Employee show route', () => {
      beforeEach(() => {
        pathName = '/admin/employees/show'
        testRouter = SpaRouter({ routes, pathName })
      })

      it('should set path', () => {
        expect(testRouter.activeRoute.path).to.equal('/admin/employees/show')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.component).to.equal('AdminIndex')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.nestedRoutes.length).to.equal(1)
      })

      it('should set nested component name', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].component).to.equal('EmployeesIndex')
      })

      it('should set component name', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].nestedRoutes.length).to.equal(1)
      })

      it('should set nested component name', () => {
        expect(testRouter.activeRoute.nestedRoutes[0].nestedRoutes[0].component).to.equal('ShowEmployee')
      })
    })
  })
})

describe('navigateTo', () => {
  describe('when route is valid', () => {
    beforeEach(() => {
      SpaRouter({ routes: [{ name: '/', component: 'MainPage' }], pathName }).activeRoute
    })

    it('should set the active route to selected route', () => {
      expect(navigateTo('/')).to.include({ name: '/', component: 'MainPage', path: '/' })
    })
  })

  describe('when route is empty', () => {
    beforeEach(() => {
      pathName = ''
      SpaRouter({ routes: [{ name: '/', component: 'MainPage' }], pathName }).activeRoute
    })

    it('should set the active route to home', () => {
      expect(navigateTo('/')).to.include({ name: '/', component: 'MainPage', path: '/' })
    })
  })

  describe('when route is not valid', () => {
    beforeEach(() => {
      SpaRouter({ routes: [{ name: '/', component: 'MainPage' }], pathName }).activeRoute
    })

    it('should set the active route to 404', () => {
      expect(navigateTo('/invalid')).to.include({ name: '404', component: '', path: '404' })
    })
  })
})

describe('currentRoute', () => {
  beforeEach(() => {
    routes = [
      { name: '/', component: 'MainPage' },
      {
        name: 'current',
        component: 'Current',
        nestedRoutes: [
          {
            name: 'active/:id',
            component: 'Active',
            nestedRoutes: [{ name: 'route', component: 'Route' }]
          }
        ]
      }
    ]
    pathName = '/current/active/route?test=true&routing=awesome'
  })

  describe('a standard route', () => {
    beforeEach(() => {
      SpaRouter({ routes, pathName }).activeRoute
    })

    it('should return true', () => {
      expect(currentRoute(pathName)).to.be.true
    })
  })

  describe('a route with named params', () => {
    beforeEach(() => {
      pathName = '/current/active/4343/route/?test=true&routing=awesome'
      SpaRouter({ routes, pathName }).activeRoute
    })

    it('should return true', () => {
      expect(currentRoute(pathName)).to.be.true
    })
  })

  describe('a route without first forward slash', () => {
    beforeEach(() => {
      pathName = 'current/active/4343/route/?test=true&routing=awesome'
      SpaRouter({ routes, pathName }).activeRoute
    })

    it('should return true', () => {
      expect(currentRoute(pathName)).to.be.true
    })
  })

  describe('a non active route', () => {
    beforeEach(() => {
      SpaRouter({ routes, pathName }).activeRoute
    })

    it('should return false', () => {
      expect(currentRoute('/other/not/active')).to.be.false
    })
  })
})
