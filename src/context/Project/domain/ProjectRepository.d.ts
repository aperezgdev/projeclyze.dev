import { Optional } from '../../Shared/domain/Optional'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'

export interface ProjectRepository {
  findByOwner(owner: Uuidv7): Promise<Project[]>
  findById(id: Uuidv7): Promise<Optional<Project>>
  save(project: Project): Promise<Project>
  update(project: Project): Promise<Project>
  delete(project: Project): Promise<void>
}
