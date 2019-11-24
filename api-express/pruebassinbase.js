require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const {getAllFutbolistas, getFutbo, createfutbolista, updateid, deleteid} = require ('./funciones')

describe('Futbolistas Describe', () => {
    let mockfutbo = []

    //read all users
    it('will get all users',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = sandbox.stub()
        const nextMock = sandbox.stub()

        mockfutbo.push({
            id: 1, nombre: 'Lorenzo', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'
        })
        mockfutbo.push({
            id: 2, nombre: 'Juan', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'},

        )
        mockfutbo.push(
            {id: 3, nombre: 'Miguel', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'})

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
        getAllFutbolistas(reqMock, res)
        sinon.assert.calledWith(statusMock,200)
        sinon.assert.calledWith(jsonMock,mockfutbo)
    })

    //read un usuario

    it('will get one futbolista',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 1
            }
        }
        const nextMock = sandbox.stub()

        const response = {
            id: 1, nombre: 'Lorenzo', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-1999', equipo: 'Napoli'
        }
        
        
        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
        getFutbo(reqMock, res)
        sinon.assert.calledWith(statusMock,200)
        sinon.assert.calledWith(jsonMock,response)
    })

    it('will get one futbolista',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 4
            }
        }
        const nextMock = sandbox.stub()

        
        
        
        const res = 
        {
            status: statusMock,
         
        }
        getFutbo(reqMock, res)
        sinon.assert.calledWith(statusMock,404)
    })

    //create
    it('will create user',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: 'Lorenzo', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
        const respuesta = "El Futbolista se agrego con exito"
        createfutbolista(reqMock, res)
        sinon.assert.calledWith(statusMock,201)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user nombre require',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"nombre\" is required"
        createfutbolista(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user nombre max25',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzojfdklsañjfdkalsñfjdlksafjdsalñk",apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"nombre\" length must be less than or equal to 15 characters long"
        createfutbolista(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user nombre require',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"nombre\" is required"
        createfutbolista(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user apellido max25',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo",apellido: 'apellidofdsajfdasfdasfdsafdsa', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"apellido\" length must be less than or equal to 25 characters long"
        createfutbolista(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user apellido require',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo", lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"apellido\" is required"
        createfutbolista(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user fechanac formato incorrecto',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo",apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-29', equipo: 'Napoli'
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }

    const respuesta = "La fecha no esta en el formato correcto"
        createfutbolista(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user lugarnac require',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo", apellido: "hola", fechanac: '21-12-2199', equipo: 'Napoli'
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"lugarnac\" is required"
        createfutbolista(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user equipo max25',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo",apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napolifjdklasfjdkalsñfjdaslkf'
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"equipo\" length must be less than or equal to 25 characters long"
        createfutbolista(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user equipo require',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo", apellido:"hola", lugarnac: 'italia', fechanac: '21-12-2199'
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"equipo\" is required"
        createfutbolista(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    //update
    it('will update user',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()

        

        const reqMock = {
            body: {
                nombre: 'Lorenzo', apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                },
                 params: {
                    id: 1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
        const respuesta = "El Futbolista se actualizo con exito"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,204)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will err update futbolista',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 12
            }
        }
        const nextMock = sandbox.stub()

        
        
        
        const res = 
        {
            status: statusMock,
            send:jsonMock
         
        }
        const respuesta = "El ID no existe"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,404)
        sinon.assert.calledWith(jsonMock, respuesta)

    })

    it('will erro update nombre require',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                },
                params: {
                    id:1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"nombre\" is required"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro update nombre max25',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzojfdklsañjfdkalsñfjdlksafjdsalñk",apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                },
                params: {
                    id:1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"nombre\" length must be less than or equal to 15 characters long"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro update nombre require',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                },
                params: {
                    id:1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"nombre\" is required"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro update apellido max25',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo",apellido: 'apellidofdsajfdasfdasfdsafdsa', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                },
                params: {
                    id:1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"apellido\" length must be less than or equal to 25 characters long"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user apellido require',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo", lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napoli'
                },
                params: {
                    id:1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"apellido\" is required"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user fechanac formato incorrecto',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo",apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-29', equipo: 'Napoli'
                },
                params: {
                    id:1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }

    const respuesta = "La fecha no esta en el formato correcto"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user lugarnac require',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo", apellido: "hola", fechanac: '21-12-2199', equipo: 'Napoli'
                },
                params: {
                    id:1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"lugarnac\" is required"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user equipo max25',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo",apellido: 'apellido', lugarnac: 'italia', fechanac: '21-12-2199', equipo: 'Napolifjdklasfjdkalsñfjdaslkf'
                },
                params: {
                    id:1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"equipo\" length must be less than or equal to 25 characters long"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    it('will erro user equipo require',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()


        const reqMock = {
            body: {
                nombre: "Lorenzo", apellido:"hola", lugarnac: 'italia', fechanac: '21-12-2199'
                },
                params: {
                    id:1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
    const respuesta = "\"equipo\" is required"
        updateid(reqMock, res)
        sinon.assert.calledWith(statusMock,400)
        sinon.assert.calledWith(jsonMock, respuesta)
    })


    //delete

    it('will delete user',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()

        

        const reqMock = {
            body: {
                
                },
                 params: {
                    id: 1
                }
            }

        const res = 
        {
            status: statusMock,
            send: jsonMock
        }
        const respuesta = "Los datos fueron eliminados con exito"
        deleteid(reqMock, res)
        sinon.assert.calledWith(statusMock,204)
        sinon.assert.calledWith(jsonMock, respuesta)
    })

    
    it('will err delete futbolista',() => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 12
            }
        }
        const nextMock = sandbox.stub()

        
        
        
        const res = 
        {
            status: statusMock,
            send:jsonMock
         
        }
        const respuesta = "El ID no existe"
        deleteid(reqMock, res)
        sinon.assert.calledWith(statusMock,404)
        sinon.assert.calledWith(jsonMock, respuesta)

    })



})
