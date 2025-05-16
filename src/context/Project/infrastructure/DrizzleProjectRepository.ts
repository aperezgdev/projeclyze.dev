import { eq } from 'drizzle-orm'
import { Optional } from '../../Shared/domain/Optional'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { DrizzleRepository } from '../../Shared/infrastructure/DrizzleRepository'
import { DrizzleSchema } from '../../Shared/infrastructure/DrizzleSchema'
import { Project } from '../domain/Project'
import { ProjectRepository } from '../domain/ProjectRepository'
import { project, projectToUser } from './DrizzleProject.schema'

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

    const resultMembers = await this.db
      .select({ user_id: projectToUser.user_id })
      .from(projectToUser)
      .where(eq(projectToUser.project_id, result[0].id))

    return result.map((result) =>
      Project.fromPrimitives({
        id: result.id,
        title: result.title,
        description: result.description,
        owner: result.owner,
        members: resultMembers.map((resultMember) => resultMember.user_id),
        createdOn: result.created_on,
        updatedOn: result.updated_on,
      }),
    )
  }
  async findById(id: Uuidv7): Promise<Optional<Project>> {
    const result = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().id, id.value))

    if (result.length === 0) Optional.empty()

    const resultMembers = await this.db
      .select({ user_id: projectToUser.user_id })
      .from(projectToUser)
      .where(eq(projectToUser.project_id, result[0].id))

    return Optional.of(
      Project.fromPrimitives({
        id: result[0].id,
        title: result[0].title,
        description: result[0].description,
        owner: result[0].owner,
        members: resultMembers.map((resultMember) => resultMember.user_id),
        createdOn: result[0].created_on,
        updatedOn: result[0].updated_on,
      }),
    )
  }

  async save(project: Project): Promise<Project> {
    return await this.save(project)
  }
  async update(project: Project): Promise<Project> {
    const projectToUpdate = project.toPrimitives()

    const result = await this.db
      .update(this.schema())
      .set(projectToUpdate)
      .where(eq(this.schema().id, project.id.value))

    return result.rows[0]
  }

  async delete(id: Uuidv7): Promise<void> {
    await this.db.delete(this.schema()).where(eq(this.schema().id, id.value))
  }
}
