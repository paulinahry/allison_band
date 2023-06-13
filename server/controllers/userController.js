import User from '../models/userModel.js'

const getUser = async (req, res) => {
    const user = await User(req.user)
    res.status(200).send(user)
}

const getUserById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).populate('orders')

    res.status(200).send(user)
}

const login = async (req, res) => {
    const { email, password } = req.body
  
    try {
      const user = await User.findOne({ email })
  
      if (!user) {  // oder password is not correct
        return res.status(401).json({ error: 'Invalid email or password' })
      }
  
      res.status(200).json({ message: 'Login successful' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'An error occurred during login' })
    }
  }
  

export default { getUser, getUserById ,login}
