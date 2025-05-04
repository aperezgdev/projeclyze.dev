import { Optional } from '../../Shared/domain/Optional'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from './Task'

export interface TaskRepository {
  save(task: Task): Promise<void>
  findByOwner(ownerId: Uuidv7): Promise<Task[]>
  findById(taskId: Uuidv7): Promise<Optional<Task>>
  update(task: Task): Promise<Task>
  delete(taskId: Uuidv7): Promise<void>
}
