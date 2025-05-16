import { eq } from 'drizzle-orm'
import { Optional } from '../../Shared/domain/Optional'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { DrizzleRepository } from '../../Shared/infrastructure/DrizzleRepository'
import { DrizzleSchema } from '../../Shared/infrastructure/DrizzleSchema'
import { Project } from '../domain/Project'
import { ProjectRepository } from '../domain/ProjectRepository'
import { project } from './DrizzleProject.schema'

export class DrizzleProjectRepository
  extends DrizzleRepository<Project>
  implements ProjectRepository
{
  protected schema(): DrizzleSchema {
    return project
  }

  async findByOwner(owner: Uuidv7): Promise<Project[]> {
    const result = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().owner, owner.value))
    if (result.length === 0) return []

    return result.map((result) =>
      Project.fromPrimitives({
        id: result.id,
        title: result.title,
        description: result.description,
        owner: result.owner,
        createdOn: result.created_on,
        updatedOn: result.updated_on,
      }),
    )
  }
  findById(id: Uuidv7): Promise<Optional<Project>> {
    throw new Error('Method not implemented.')
  }
  save(project: Project): Promise<Project> {
    throw new Error('Method not implemented.')
  }
  update(project: Project): Promise<Project> {
    throw new Error('Method not implemented.')
  }
  delete(project: Project): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
