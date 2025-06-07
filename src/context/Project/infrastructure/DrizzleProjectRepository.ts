import { eq } from 'drizzle-orm'
import { Optional } from '../../Shared/domain/Optional'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { DrizzleRepository } from '../../Shared/infrastructure/DrizzleRepository'
import { DrizzleSchema } from '../../Shared/infrastructure/DrizzleSchema'
import { Project } from '../domain/Project'
import { ProjectRepository } from '../domain/ProjectRepository'
import { project, projectToUser } from './DrizzleProject.schema'
import { Logger } from '@projeclyze/context/Shared/domain/Logger'

export class DrizzleProjectRepository
  extends DrizzleRepository
  implements ProjectRepository
{

  constructor(readonly logger: Logger) {
    super()
  }

  protected schema(): DrizzleSchema {
    return project
  }

  async findByOwner(owner: Uuidv7): Promise<Project[]> {
    this.logger.log(`Finding projects by owner: ${owner.value}`)
    const result = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().owner, owner.value))
    this.logger.log(
      `Found ${result.length} projects for owner: ${owner.value}, results: ${JSON.stringify(result)}`,
    )
    if (result.length === 0) return []

    const resultMembers = await this.db
      .select({ user_id: projectToUser.user_id })
      .from(projectToUser)
      .where(eq(projectToUser.project_id, result[0].id))
    
    this.logger.log(
      `Found ${resultMembers.length} members for projects of owner: ${owner.value}, results: ${JSON.stringify(resultMembers)}`,
    )

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
    this.logger.log(`Finding project by id: ${id.value}`)
    const result = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().id, id.value))

    this.logger.log(
      `Finding project by id: ${id.value}, result: ${JSON.stringify(result)}`,
    )
    if (result.length === 0) Optional.empty()

    const resultMembers = await this.db
      .select({ user_id: projectToUser.user_id })
      .from(projectToUser)
      .where(eq(projectToUser.project_id, result[0].id))

    this.logger.log(
      `Found ${resultMembers.length} members for project with id: ${id.value}, results: ${JSON.stringify(resultMembers)}`,
    )
    
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

  async save(project: Project): Promise<void> {
    this.logger.log(`Saving project: ${JSON.stringify(project.toPrimitives())}`)
    await this.insert(project.toPrimitives())
  }
  async update(project: Project): Promise<Project> {
    this.logger.log(`Updating project: ${JSON.stringify(project.toPrimitives())}`)
    const projectToUpdate = project.toPrimitives()

    const result = await this.db
      .update(this.schema())
      .set(projectToUpdate)
      .where(eq(this.schema().id, project.id.value))

    this.logger.log(`Project updated: ${JSON.stringify(result)}`)
    return result.rows[0]
  }

  async delete(id: Uuidv7): Promise<void> {
    this.logger.log(`Deleting project with id: ${id.value}`)
    await this.db.delete(this.schema()).where(eq(this.schema().id, id.value))
  }
}
