"""fix email foreign key

Revision ID: 7288ff61da0e
Revises: df4f9df926a3
Create Date: 2020-09-14 11:18:30.505329

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7288ff61da0e'
down_revision = 'df4f9df926a3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('blog_post', sa.Column('email', sa.String(length=100), nullable=False))
    op.drop_constraint('blog_post_user_fkey', 'blog_post', type_='foreignkey')
    op.create_foreign_key(None, 'blog_post', 'user', ['email'], ['email'])
    op.drop_column('blog_post', 'user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('blog_post', sa.Column('user', sa.VARCHAR(length=100), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'blog_post', type_='foreignkey')
    op.create_foreign_key('blog_post_user_fkey', 'blog_post', 'user', ['user'], ['email'])
    op.drop_column('blog_post', 'email')
    # ### end Alembic commands ###
