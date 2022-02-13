import { NextApiHandler } from 'next'
import { object, string, Asserts } from 'yup'

const formInputSchema = object({
  email: string().email().required(),
  first_name: string().optional(),
  last_name: string().optional(),
  company: string().optional(),
  phone: string().optional(),
  description: string().optional(),
  budget: string().optional(),
}).label('Form Input')

export type FormInput = Asserts<typeof formInputSchema>

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'POST':
        const formInput = await formInputSchema.validate(req.body)

        res.status(200)
      default:
        throw new Error(`Unsupported method "${req.method}"`)
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
